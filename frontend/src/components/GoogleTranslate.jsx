import React, { useEffect } from "react";

const GoogleTranslate = () => {
  useEffect(() => {
    window.googleTranslateInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        setTimeout(window.googleTranslateInit, 100);
      } else {
        new window.google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: 'en,hi,pa,sa,mr,ur,bn,es,ja,ko,zh-CN,es,nl,fr,de,it,ta,te',
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          defaultLanguage: 'en',
          autoDisplay: false,
        }, 'google_element');
      }
    };

    const loadGoogleTranslateScript = () => {
      if (!document.getElementById("google_translate_script")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateInit";
        script.id = "google_translate_script";
        script.onerror = () => console.error('Error loading Google Translate script');
        document.body.appendChild(script);
      }
    };

    loadGoogleTranslateScript();

    if (window.google && window.google.translate) {
      window.googleTranslateInit();
    }
  }, []);

  return (
    <div className="google-translate-container p-1 w-44">
      {/* Google translate element */}
      <div id="google_element" className="inline-block"></div>

      {/* Custom select styling */}
      <style jsx>{`
        .goog-te-combo {
          background-color: #d1fae5; /* Light green background */
          border: 2px solid #10b981; /* Green border */
          border-radius: 0.375rem; /* Rounded edges */
          padding: 0.5rem;
          font-size: 1rem;
          transition: all 0.2s;
          outline: none;
        }

        .goog-te-combo:hover {
          background-color: #86efac; /* Hover effect: lighter green */
          border-color: #047857; /* Darker green border on hover */
        }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
