import Container from "../../../layouts/Container/Container";
import Title from "../../Title/Title";

const Location = () => {
  return (
    <section>
      <Title>Our LOCATION</Title>
      <Container className="grid grid-cols-1 lg:grid-cols-2 gap-7 justify-center items-center px-2 py-7">
        <div>
          <iframe
            width="100%"
            style={{ aspectRatio: "16/9" }}
            src="https://www.youtube.com/embed/hZFL8_oTluA?si=7IiI8JifpxcExi5A"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3621.270444305559!2d92.15560017446013!3d24.820423346860164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3751cb85874089d1%3A0x87a52586bcd514fc!2zUmF2ZVRhZyDgprDgp4fgpofgpqwg4Kaf4KeH4KaX!5e0!3m2!1sen!2sbd!4v1726013735640!5m2!1sen!2sbd"
            width="100%"
            style={{ border: 0, aspectRatio: "16/9" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </Container>
    </section>
  );
};
export default Location;
