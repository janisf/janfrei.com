// This file controls how Tailwind processes your CSS. For details, see
// https://tailwindcss.com/docs/configuration

module.exports =
{
  content: [
    "./source/**/*.html",
    "./source/**/*.js"
  ],


  //
  // All other TailwindCSS options are 100% under your control. Edit this config file as shown in the Tailwind Docs
  // to enable the settings or customizations you need.
  //
  theme: {
    extend: {
		colors: {
			facebook: '#4469B0',
			linkedin: '#1178B3',
			github: '#333' ,
			instagram: '#E4445C',
			telegram: '#2999D1',
			twitter: '#1B95E0',
      nomadlist: '#ff4742',
      threads: '#000000',
		}
	}
  },

  variants: {},

  //
  // If you want to run any Tailwind plugins (such as 'tailwindcss-typography'), simply install those into the Project via the
  // Packages area in CodeKit, then pass their names (and, optionally, any configuration values) here.
  // Full file paths are not necessary; CodeKit will find them.
  //
  plugins: []
}
