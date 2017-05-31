function($scope, spUtil) { /* widget controller */
    var c = this;
    /***
    Set up the Reference Field to Events. Bind field to c.data variables.
    ***/
    $scope.evt = {
        displayValue: c.data.eventName, value: c.data.eventId,
        name: 'evt'
    };
    /***
    Add selected Attendee to the chosen Event. ***/
    c.doIt = function () {
        /***
        Basic field validation. Make sure entire form is filled in. ***/
        if (!$scope.evt.value || !c.data.attendeeFirstName ||
            !c.data.attendeeLastName || !c.data.attendeeEmail) spUtil.addErrorMessage('Please fill out all fields on the form above.');
        else { /***
Package up the form values to pass to the Server Script function. ***/
            var input = {
                'event': $scope.evt.value,
                'first_name': c.data.attendeeFirstName, 'last_name': c.data.attendeeLastName, 'email': c.data.attendeeEmail
            };
            /***
            Call Server script passing input to the function ***/
            c.server.get(input).then(function (r) {
                if (r.data.success) {
                    spUtil.addTrivialMessage(c.data.attendeeFirstName + ' ' +
                        c.data.attendeeLastName + ' was successfully added to ' + $scope.evt.displayValue + ".");
                    c.data.attendeeFirstName = c.data.attendeeLastName = c.data.attendeeEmail = '';
                } else {
                    spUtil.addErrorMessage('There was a problem adding the attendee. Please contact your administrator.');
                }
            })
        }
    }
}