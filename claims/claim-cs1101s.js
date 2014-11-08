// ***********************************************************
// READ THE FOLLOWING BEFORE STARTING
// ***********************************************************
// 1. **IMPORTANT STEP** Change the properties in the config object in the next section.

// 2. Login to the portal at: https://mysoc.nus.edu.sg/~tssclaim/. Fill in your bank account information if you haven't.

// 3. Access the page titled 'Student Claim Submission' (https://mysoc.nus.edu.sg/~tssclaim/tutor/teach_claim.php?page=1) and click on
//    the 'Claim' button under your module. You should see the interface for you to enter details of the teaching claim activity.

// 4. Open the JS console (Ctrl/Cmd + Shift/Option + J), paste all the code in this file in the JS console and press enter. You should
//    see the message 'Claim object successfully created. Run c.makeAllClaims() to start.'.

// 5. Run the function c.makeAllClaims() . Wait until the alert 'All claims made!' is shown, then press 'OK'.

// 6. You will be brought back to the previous page. Click on the button 'Claim' again and verify that you have the right number of hours.

// To delete all claims on the page, run the function c.deleteAllClaims()


// ***********************************************************
// CONFIGURE THE RELEVANT PROPERTIES IN THE CONFIG OBJECT
// ***********************************************************

var config = {
  // Your NUSSTU ID, such as a0099999
  student_id: prompt("Your NUSSTUID, such as a0099999"),
  // Module you are claiming hours for, such as CS1101S
  module: prompt("Module code, such as CS1101S"),
  // Format: YYYY/MM/DD
  // Note: Month is from 0-11, Date is from 1-31
  // This should be the semester's week 1. For AY13/14 Sem 2, it's Monday, Jan 13
  first_day_of_sem: new Date(2014,7,11),
  // In case you want to customize the duties field for each activity
  // Do not modify the keys
  duties: {
    'Assignment Marking': 'Graded students\' assignments',
    'Course Material Preparation': 'Prepared course materials',
    'Tutorial': 'Conducted tutorial',
    'Consultation with students': 'Had consultation with students'
  },

  // The following function should return a list of claim objects that you want to make
  activities_list_fn: function() {
    var activities_list = [];

    // 2h DG * 11 weeks = 22 hours
    // 2h preparation * 10 weeks = 20 hours
    // 2h grading * 14 weeks = 28 hours
    //
    // TOTAL: 70 hours
    for (var week = 1; week <= 13; week++) {
      activities_list.push({
        activity_type: Claim.ASSIGNMENT_MARKING,
        week: week,
        day: 'SATURDAY',
        start_time: '1300',
        end_time: '1500'
      });

      if (week === 1 || week === 8) {
        // there was no tutorial in week 1 and 8 (PH)
      } else {
        activities_list.push({
          activity_type: Claim.TUTORIAL,
          week: week,
          day: 'TUESDAY',
          start_time: '1400',
          end_time: '1600'
        });
      }

      if (week <= 10) {
        activities_list.push({
          activity_type: Claim.COURSE_MATERIAL_PREPARATION,
          week: week,
          day: 'MONDAY',
          start_time: '1800',
          end_time: '2000'
        });
      }
    };
    activities_list.push({
      activity_type: Claim.ASSIGNMENT_MARKING,
      week: 'RECESS',
      day: 'SATURDAY',
      start_time: '1300',
      end_time: '1500'
    });
    return activities_list;
  }
}

// ***********************************************************
// DO NOT CHANGE THE BOTTOM UNLESS YOU KNOW WHAT YOU ARE DOING
// ***********************************************************

var core_script = 'https://rawgit.com/nusmodifications/nus-soc-scripts/master/claims/claim.js';
var c = undefined;
$.getScript(core_script)
  .done(function(){
    c = new Claim(config);
  })
  .fail(function( jqxhr, settings, exception ) {
    console.log("Error loading script");
    console.log(jqxhr);
    console.log(exception);
  })
// c.makeAllClaims();
