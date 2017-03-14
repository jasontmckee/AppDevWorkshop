(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    // query for a marketing event whose sys_id matches the id in the URI path 
    var event = new GlideRecord('YOUR_SCOPED_TABLE_marketing_event');
    if (event.get('sys_id', request.pathParams.id)) { // build a result object to return
        // be sure to convert GlideElements to Strings // using getValue()/getDisplayValue()
        var result = {
            name: event.getDisplayValue('name'), location: {
                name: event.getDisplayValue('location'),
                value: event.getValue('location')
            },
            startDate: event.getValue('start_date'), endDate: event.getValue('end_date'), equipment: []
        };
        // now add any equipment related to the event to the result object
        var equipment = new GlideRecord('YOUR_SCOPED_TABLE_equipment_request'); equipment.addQuery('marketing_event', event.getUniqueValue()); equipment.query();
        while (equipment.next()) {

            var item = {
                type: equipment.getDisplayValue('type'), cost: equipment.getDisplayValue('type.cost')
            };
            result.equipment.push(item);
        }
        // return the result as an object, the platform will // convert the object to JSON or XML depending on
        // the headers in the request
        return result;
    }
    // if no matching id, return 404
    return new sn_ws_err.NotFoundError('No record matching id ' + request.pathParams.id + ' found');
})(request, response);