const shareButton = document.querySelector('.share-button');
const shareDialog = document.querySelector('.share-dialog');
const closeButton = document.querySelector('.close-button');

shareButton.addEventListener('click', event => {
  if (navigator.share) { 
   navigator.share({
      title: 'WebShare API Demo',
      url: 'https://codepen.io/ayoisaiah/pen/YbNazJ'
    }).then(() => {
      console.log('Thanks for sharing!');
    })
    .catch(console.error);
    } else {
        shareDialog.classList.add('is-open');
    }
});

closeButton.addEventListener('click', event => {
  shareDialog.classList.remove('is-open');
});

// $("#shareButtonLabel").jsSocials({
//   showCount: false,
//   showLabel: true,
//   shares: [
//       "email",
//       "twitter",
//       "facebook",
//       "googleplus",
//       "linkedin",
//       { share: "pinterest", label: "Pin this" },
//       "stumbleupon",
//       "whatsapp"
//   ]
// });