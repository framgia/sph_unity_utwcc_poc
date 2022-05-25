const myPlugin = {
  SendToBrowser: function(str) {
    document.getElementById('from-unity').innerHTML = UTF8ToString(str);
  }
}

mergeInto(LibraryManager.library, myPlugin);