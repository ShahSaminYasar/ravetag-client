import { useRef, useState } from "react";
import Title from "../../components/Title/Title";
import { useValues } from "../../hooks/Contexts/useValues";
import Container from "../../layouts/Container/Container";
import { useAxiosPublic } from "../../hooks/Axios/useAxiosPublic";
import Loader from "../../components/Loaders/Loader";
import LoaderDiv from "../../components/Loaders/LoaderDiv";
import { Navigate, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = () => {
  const axios = useAxiosPublic();
  const navigate = useNavigate();

  const { user, setUser, loading: userLoading } = useValues();

  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState();
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const phoneValueRef = useRef(null);

  if (user?.verified) return <Navigate to="/account" />;

  const handleSendOTP = async (e) => {
    event.preventDefault();
    setLoading(true);
    if (step === 1) {
      let phoneValue = e.target.phone.value;
      phoneValue = phoneValue.replace(/[^0-9]/g, "");

      if (phoneValue == "") {
        setLoading(false);
        return alert("Please enter a valid phone number to verify!");
      }
      setPhone(phoneValue);

      try {
        const getOTP = await axios.get(`/otp?phone=${phoneValue}`);
        if (getOTP?.data?.status_code === 200) {
          setLoading(false);
          setStep(2);
          e.target.otp.value = "";
          setButtonDisabled(true);
        } else {
          setLoading(false);
          console.log(getOTP?.data?.message);
          return alert(getOTP?.data?.message);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        return alert(error?.response?.data?.message || `An error occured`);
      }
    } else {
      let otp = e.target.value;
      if (otp?.length < 6) {
        setLoading(false);
        setButtonDisabled(true);
        return;
      }
      if (otp?.length > 6) {
        setLoading(false);
        otp = otp?.slice(0, 6);
        e.target.value = otp;
      }

      try {
        setLoading(true);
        const verify = await axios.get(
          `/verify-phone?phone=${phone}&otp=${otp}`
        );

        if (verify?.data?.valid) {
          setLoading(false);
          setUser({ phone: phone, verified: true });
          return navigate("/account");
        } else {
          setLoading(false);
          alert(verify?.data?.message);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
        return alert(error?.response?.data?.message || `An error occured`);
      }

      setButtonDisabled(false);
    }
  };

  if (userLoading) return <LoaderDiv />;
  if (user?.verified === true) return;

  return (
    <>
      <Helmet>
        <title>Login/Verify | RaveTag BD</title>
      </Helmet>
      <Container className={`pt-10 pb-4 px-2`}>
        <form
          onSubmit={(e) => handleSendOTP(e)}
          className="flex flex-col gap-3 text-sm text-slate-800 p-4 border-2 border-slate-200 border-dashed shadow-sm max-w-80 mx-auto"
        >
          <Title>Login</Title>

          {/* Phone Number Input */}
          <span className={`${step === 2 ? "hidden" : "block"}`}>
            Enter your phone number{" "}
            <span className="font-semibold">(With Country Code)</span>{" "}
            <span className="italic text-slate-500">Ex: +88017*****123</span>
          </span>
          <input
            type="text"
            name="phone"
            ref={phoneValueRef}
            placeholder="+880 17******90"
            defaultValue={
              user?.phone ? `+${user?.phone?.replace(/[^0-9]/g, "")}` : `+880`
            }
            className={`input input-bordered ${
              step === 2 ? "hidden" : "block"
            }`}
          />

          {/* OTP Input */}
          <span className={`${step === 1 ? "hidden" : "block"}`}>
            Enter the 6-digit code sent to{" "}
            <span className="font-semibold">+{phone}</span>
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setButtonDisabled(false);
                phoneValueRef.current.value = "";
                setLoading(false);
              }}
              className="italic text-blue-500 text-sm font-medium ml-2 cursor-pointer"
            >
              Wrong number?
            </button>
          </span>
          <input
            type="text"
            name="otp"
            placeholder="******"
            className={`input input-bordered ${
              step === 1 ? "hidden" : "block"
            }`}
            defaultValue={""}
            onChange={(e) => handleSendOTP(e)}
          />

          <button
            className="btn bg-blue-600 hover:bg-blue-800 text-white disabled:opacity-70 disabled:bg-blue-400 disabled:text-blue-600"
            type="submit"
            disabled={buttonDisabled || loading}
          >
            {loading ? <Loader /> : step === 1 ? "Send OTP" : "Verify"}
          </button>
        </form>

        <div
          className={`text-xs text-slate-600 flex ${
            step === 2
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          } flex-col gap-1 items-center my-3 mx-2 font-normal`}
        >
          <span>
            সর্বোচ্চ ৫ মিনিটের মধ্যে SMS না পেলে আমাদের Helpline-এ কল করুন।
          </span>
          <span>
            Helpline:{" "}
            <a href="tel:+8801778070630" className="text-red-600">
              +880 1778-070630
            </a>
          </span>
        </div>
      </Container>
    </>
  );
};
export default Login;
