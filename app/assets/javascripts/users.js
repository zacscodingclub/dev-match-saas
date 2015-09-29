$(document).ready(function() {
  Stripe.setPublishableKey($('meta[name="stripe-key"]').attr('content'));
  // listens for form submission
  $("#form-submit-btn").click(function(event) {
    event.preventDefault();
    $('input[type=submit]').prop('disabled', true);
    var error = false;
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
        
    if (!error) {
      // get stripe token
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  }); //form submission
  
  function stripeResponseHandler(status, response) {
    // get a reference to the from
    var f = $("#new_user");
    
    // get token from response
    var token = response.id;
    
    // add token to form
    f.append('<input type="hidden" name="user[stripe_card_token]" value="' + token + '" />');
    
    // submit form
    f.get(0).submit();
  }
});