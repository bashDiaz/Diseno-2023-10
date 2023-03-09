function updateData() {
    const req = new XMLHttpRequest();
    req.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        const data = this.responseText.split(';');
        const ul = document.getElementById('data');
        ul.innerHTML = '';
        for (let i = data.length - 1; i >= 0; i--) {
          const li = document.createElement('li');
          li.appendChild(document.createTextNode(data[i]));
          ul.appendChild(li);
        }
      }
    };
    req.open('GET', '/data', true);
    req.send();
  }
  setInterval(updateData, 10000);