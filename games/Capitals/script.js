//click the button with enter
document.onkeydown = function (evt) {
  var keyCode = evt ? (evt.which ? evt.which : evt.keyCode) : event.keyCode;
  if (keyCode == 13) {
    document.getElementById('btn').click();
    }
 else {
    return true;
  }
};

//validating the input
var charInput;
function char() {
    charInput = document.getElementById('answ');
    //autofocus for the input 
    charInput.focus();
    charInput.onkeydown = charInput.onblur = charInput.onkeyup = function()
    {
        charInput.value = charInput.value.replace(/[^A-Za-z]/gi, "");
    }
}