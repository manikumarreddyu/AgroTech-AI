import React, { useEffect } from "react";
import { useState } from "react";

const GoogleTranslate = () => {
  const [isVisible, setIsVisible] = useState(true);

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
    <div id="google_element" className={`google-translate-container pl-20 md:pl-0 ${isVisible ? '' : 'hidden'}`}>
      <style jsx>{`
        .goog-te-combo {
          background-color: #f0fdf4; /* Light green background (Tailwind equivalent: bg-green-50) */
          border: 2px solid #10b981; /* Tailwind green-500 border */
          border-radius: 0.5rem; /* Slightly more rounded (rounded-md in Tailwind) */
          padding: 0.5rem 1rem; /* Tailwind: p-2 */
          font-size: 0.875rem; /* Tailwind: text-sm */
          transition: all 0.3s ease; /* Smooth transition */
          outline: none;
          color: #065f46; /* Dark green text (Tailwind: text-green-800) */
          font-weight: 500; /* Tailwind: font-medium */
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* Slight shadow */
        }

        .goog-te-combo:hover {
          background-color: #d1fae5; /* Hover effect: Tailwind equivalent of bg-green-100 */
          border-color: #047857; /* Darker border (Tailwind: border-green-700) */
          box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15); /* Stronger shadow on hover */
        }

        .goog-logo-link {
          display: none !important;
        }

        .goog-te-gadget {
          color: transparent !important;
        }

        .goog-te-gadget > span > a {
          display: none !important;
        }

        .goog-te-gadget .goog-te-combo {
          color: green !important;
        }

        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value span:first-child {
          display: none;
        }

        #google_translate_element .goog-te-gadget-simple .goog-te-menu-value:before {
          content: 'Translate';
        }

        .goog-te-banner-frame {
          display: none !important;
        }

        .goog-te-menu-frame {
          max-height: 400px !important;
          overflow-y: auto !important;
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
