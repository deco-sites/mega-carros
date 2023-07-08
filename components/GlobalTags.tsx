import { asset, Head } from "$fresh/runtime.ts";

function GlobalTags() {
  return (
    <Head>
      {/* Icons */}
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={asset("/favicon-32x32.png")}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={asset("/favicon-16x16.png")}
      />
      <link
        rel="shortcut icon"
        type="image/x-icon"
        href={asset("/favicon-32x32.png")}
      />

      {/* Web Manifest */}
      <link rel="manifest" href={asset("/site.webmanifest")} />
      <meta name="theme-color" content="#221E1F" />
      <meta name="msapplication-TileColor" content="#221E1F" />

      {
        /*
         * Include fonts
         * tip: It's always better copy fonts to the `/static/fonts` folder than serving from another
         * domain since DNS resolution times can really affect performance.
         */
      }
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @font-face {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 400;
            font-display: swap;
            src: url(${asset("/fonts/barlow-400.ttf")});
          }

          @font-face {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 500;
            font-display: swap;
            src: url(${asset("/fonts/barlow-500.ttf")});
          }

          @font-face {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 600;
            font-display: swap;
            src: url(${asset("/fonts/barlow-600.ttf")});
          }

          @font-face {
            font-family: 'Barlow';
            font-style: normal;
            font-weight: 700;
            font-display: swap;
            src: url(${asset("/fonts/barlow-700.ttf")});
          }

          body {
            background: #000000;
            color: #FFFFFF;
          }

          @media (min-aspect-ratio: 16/9) {
            .RESPONSIVE_IFRAME {
              height: 56.25vw;
            }
          }

          @media (max-aspect-ratio: 16/9) {
            .RESPONSIVE_IFRAME {
              width: 177.78vh;
            }
          }
      `,
        }}
      />
    </Head>
  );
}

export default GlobalTags;
