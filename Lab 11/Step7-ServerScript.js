(function () {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */
    /***
    If a server call is performed, run this function. ***/
    if (input) {
        var attendee = new GlideRecord('YOUR_SCOPED_TABLE_attendee'); attendee.initialize();
        attendee.marketing_event = input.event;
        attendee.first_name = input.first_name;
        attendee.last_name = input.last_name; 
        attendee.email = input.email; 
        data.success = attendee.insert(); 
        return;
    }

})();