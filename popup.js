function loadFile() {
    let file = document.getElementById("fileInput").files[0];
  
    if (!file) {
      alert("Please upload the JSON file from extension");
      return;
    }
  
    let reader = new FileReader();
  
    reader.onload = function(e) {
      let data = JSON.parse(e.target.result);
  
      document.getElementById("output").innerText =
        JSON.stringify(data, null, 2);
  
      analyze(data);
    };
  
    reader.readAsText(file);
  }