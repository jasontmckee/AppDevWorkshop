var event = new GlideRecord('x_<YOUR_SCOPE_HERE>_marketing_event');
event.get(current.marketing_event.sys_id);
event.number_of_attendees_registered =
    event.number_of_attendees_registered + 1;
event.update();
