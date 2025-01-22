/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '200px',
      // => @media (min-width: 640px) { ... }

      'md': '840px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    fontFamily: {
     'sans': ['Helvetica', 'Arial', 'sans-serif'],
    },
  
    extend: {
      colors: {
        // mainClr:'#323330',
        // primaryClr:'rgb(119, 114, 82,0.2)',
        // secondaryClr:'#F0DB4F',
        // textCLr:'#ffff',
        mainClr:'#fff',
        darkmodeMainClr:'#282828',
        textCLr:'#323330',
        lightmodeTextClr:'#000',
        darkmodeTextClr:'#f5f5f5',
        textCLr:'#323330',
        primaryClr:'rgb(119, 114, 82,0.05)',
        secondaryClr:'#F0DB4F',
        lightSecondaryClr:'#cabb5d',
        lighterSeocndaryClr:'#cab947',
        footertextClr:'#848583'
      },
    },
  },
  plugins: [],
  darkMode:'class',
}

