(function () {
  // Business hours (America/New_York): day index 0=Sun..6=Sat -> [open, close] in decimal hours
  var H = {0:[9.5,14],1:[7,19],2:[7,19],3:[7,19],4:[7,19],5:[7,19],6:[7,19]};
  var parts = new Intl.DateTimeFormat('en-US',{timeZone:'America/New_York',weekday:'short',hour:'numeric',minute:'numeric',hour12:false}).formatToParts(new Date());
  var get = function (t) { return parts.find(function (p) { return p.type === t; }).value; };
  var day = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(get('weekday'));
  var now = (parseInt(get('hour'),10) % 24) + parseInt(get('minute'),10) / 60;
  var h = H[day], open = now >= h[0] && now < h[1];
  var s = document.getElementById('status');
  if (s) {
    s.textContent = open ? 'Open now, call for same-day help' : 'Closed now, call when we open';
    s.classList.toggle('open', open);
  }
  var row = document.querySelector('tr[data-d="' + day + '"]');
  if (row) row.classList.add('today');
  var y = document.getElementById('yr');
  if (y) y.textContent = new Date().getFullYear();
})();
