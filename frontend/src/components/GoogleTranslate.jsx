import React, { useEffect } from "react";
import { useState } from "react";

const GoogleTranslate = () => {
  const [isVisible,setIsVisible] = useState(true);

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

    const handleScroll = () => {
      setIsVisible(window.scrollY < 100); // Adjust the scroll amount as needed
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div id="google_element" className={`google-translate-container ${isVisible ? '' : 'hidden'}`}>
  <style jsx>{`
    .goog-te-combo {
      background-color: #d1fae5; /* Light green background */
      border: 2px solid #10b981; /* Green border */
      border-radius: 0.375rem; /* Rounded edges */
      padding: 0.5rem;
      font-size: 0.75rem;
      transition: all 0.2s;
      outline: none;
      z-index: 1; /* Ensure the dropdown doesn't overlap navbar */
    }

    .goog-te-combo:hover {
      background-color: #86efac; /* Hover effect: lighter green */
      border-color: #047857; /* Darker green border on hover */
    }

    /* Hide the Google Translate logo link and branding */
    .goog-logo-link {
      display: none !important;
    }

    /* Hide any extra branding text or elements */
    .goog-te-gadget > span > a {
      display: none !important;
    }

    /* Custom Google Translate styling */
    #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span:first-child {
      display: none;
    }

    #google_translate_element .goog-te-gadget-simple .goog-te-menu-value:before {
      content: 'Translate';
    }

    /* Control the pop-up behavior */
    .goog-te-banner-frame {
      display: none !important; /* Hide the banner */
    }

    /* Optional: Contain the dropdown within specific boundaries */
    .goog-te-menu-frame {
      max-height: 400px !important; /* Limit height of the dropdown */
      overflow-y: auto !important; /* Enable scrolling if too large */
    }

    .skiptranslate > iframe { 
      height: 0 !important;
      border-style: none;
      box-shadow: none;
    }
  `}</style>
</div>
  );
};

export default GoogleTranslate;
