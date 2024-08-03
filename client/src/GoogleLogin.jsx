import { useEffect, useRef } from "react";

function loadGoogleScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      return resolve();
    } else {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve();
      script.onerror = (err) => reject(err);
      document.body.appendChild(script);
    }
  });
}
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
export default function GoogleButton() {
  const googleButton = useRef(null);

  useEffect(() => {
    const src = "https://accounts.google.com/gsi/client";
    loadGoogleScript(src)
      .then(() => {
        /*global google*/
        google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleCredentialResponse,
          scope:
            "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile", // Add desired scopes here
        });

        google.accounts.id.renderButton(
          googleButton.current,
          { theme: "outline", size: "large" } // Customization attributes
        );
      })
      .catch(console.error);

    return () => {
      const scriptTag = document.querySelector(`script[src="${src}"]`);
      if (scriptTag) document.body.removeChild(scriptTag);
    };
  }, []);
  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);
    // Send response.credential to the backend to verify and create a session
  };

  return <div ref={googleButton}></div>;
}
