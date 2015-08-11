import jsdom from 'jsdom'

const TIMEOUT = 30000;

var timeoutHandle;

jsdom.env({
  // url: 'http://localhost:5000/fepz',
  url: 'http://hacktabl.org/president2016',
  features: {
    FetchExternalResources: ['script'],
    ProcessExternalResources: ['script']
  },
  headers: {
    accept: 'text/html' // Make webpack-dev-server happy.
  },
  created (err, window) {
    console.log('** CREATED **');

    if(err){
      console.error(err);
      return;
    }

    window.localStorage = {}; // Fake localStorage
    window.__prerender = prerender;

    timeoutHandle = setTimeout(() => {
      console.error('Timeout!');
      window.close();
    }, TIMEOUT);
  },

  virtualConsole: jsdom.createVirtualConsole().sendTo(console)
});

function prerender(window) {
  clearTimeout(timeoutHandle);

  console.log(window.location.href);
  console.log('-------------------------------')

  setTimeout(() => {
    // Get data after digest cycle
    console.log(jsdom.serializeDocument(window.document));
    window.close();
  }, 10);
}