import Nav from "../Nav/Nav";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_t1lh8xl", "template_smio3cq", form.current, {
        publicKey: "lOv99B1sxVru9bwK5",
      })
      .then(
        (result) => {
          console.log(result.text);
          alert("SUCCESS!")
        },
        (err) => {
          console.log(err.text);
          alert("FAILED...!")
        }
      );
  };
  return (
    <div>
      <Nav />
      <h2>ContactUs Page</h2>
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <br></br>
        <input type="text" name="user_name" />
        <br></br>
        <br></br>
        <label>Email</label>
        <br></br>
        <input type="email" name="user_email" />
        <br></br>
        <br></br>
        <label>Message</label>
        <br></br>
        <textarea name="message" />
        <br></br>
        <br></br>
        <input type="submit" value="Send" />
      </form>
    </div>
  );
}

export default ContactUs;
