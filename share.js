window.fbAsyncInit = function() {
    FB.init({
      appId            : '706306563388254',
      cookie     : true,                     // Enable cookies to allow the server to access the session.
      xfbml      : true,                     // Parse social plugins on this webpage.
      autoLogAppEvents : true,
      xfbml            : true,
      version          : 'v10.0'
    });

    FB.getLoginStatus(function(response) {   // Called after the JS SDK has been initialized.
        statusChangeCallback(response);        // Returns the login status.
      });
  };

document.getElementById('requestsBtn').onclick = function() {
    FB.ui({method: 'apprequests',
        message: 'This is a test message for the requests dialog.'
    }, function(data) {
      Log.info('App Requests Response', data);
    });
  }

  document.getElementById('feedBtn').onclick = function() {
    FB.ui({
      display: 'popup',
      method: 'feed',
      link: 'https://developers.facebook.com/docs/'
    }, function(response){});
  }


  document.getElementById('ogBtn').onclick = function() {
      console.log(image.src);
    FB.ui({
      display: 'popup',
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
          object: 'https://developers.facebook.com/docs/',
      })
    }, function(response){});
  }

  document.getElementById('shareBtn').onclick = function() {
    FB.ui({
      display: 'popup',
      method: 'share',
      href: 'https://developers.facebook.com/docs/',
    }, function(response){});
  }

  function statusChangeCallback(response) {  // Called with the results from FB.getLoginStatus().
    console.log('statusChangeCallback');
    console.log(response);                   // The current login status of the person.
    if (response.status === 'connected') {   // Logged into your webpage and Facebook.
      testAPI();  
    } else {                                 // Not logged into your webpage or we are unable to tell.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this webpage.';
    }
  }


  function checkLoginState() {               // Called when a person is finished with the Login Button.
    FB.getLoginStatus(function(response) {   // See the onlogin handler
      statusChangeCallback(response);
    });
  }

  function testAPI() {                      // Testing Graph API after login.  See statusChangeCallback() for when this call is made.
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    });
  }

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

//   const upload = async (response, page_token) => {
//     let canvas = document.getElementById('canvas');
//     let dataURL = canvas.toDataURL('image/jpeg', 1.0);
//     let blob = dataURItoBlob(dataURL);
//     let formData = new FormData();
//     formData.append('access_token', response.authResponse.accessToken);
//     formData.append('source', blob);

//     let responseFB = await fetch(`https://graph.facebook.com/me/photos?access_token=${page_token}`, {
//         body: formData,
//         method: 'post'
//     });
//     responseFB = await responseFB.json();
//     console.log(responseFB);
// };

// FB.getLoginStatus(function(response) {
//     statusChangeCallback(response);
// });

// document.getElementById('upload').addEventListener('click', () => {    
//     FB.login((response) => {
//         //TODO check if user is logged in and authorized publish_pages
//         //get Page Token for upload
//         upload(response, page_token);
//     }, {scope: 'manage_pages,publish_pages'})
// })