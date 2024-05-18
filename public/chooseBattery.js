console.log("a")
    function openNav() {
      document.getElementById("mySidenav").style.width = "100%";
    }

    function closeNav() {
      document.getElementById("mySidenav").style.width = "0";
    }

    function signOut(){
      //Check tasks that have already been done
      var clientID = getCookie('clientID')
      if(clientID !== null){
        location.href = "https://mmbb.ltdk.helsinki.fi:9111/oauth2/logout/?client_id=" + clientID
      } else {
        location.href = "https://mmbb.ltdk.helsinki.fi:9111/oauth2/logout/"
      }
    }

    var queryStringIndex = window.location.search;
    var urlParamsIndex = new URLSearchParams(queryStringIndex);
     
    //Check tasks that have already been done
    var movementDone = urlParamsIndex.get('Movement')
    var emotion1Done = urlParamsIndex.get('EmotionOne')
    var emotion2Done = urlParamsIndex.get('EmotionTwo')
    var mbemaDone = urlParamsIndex.get('MBEMA')
    var singingDone = urlParamsIndex.get('Singing')
    var sharedDone = urlParamsIndex.get('SharedMeasures')
    var rhythmDone = urlParamsIndex.get('Rhythm')

    var allTasksNames = ["Movement", "EmotionAdaptive", "EmotionAdaptive2", "MBEMA", "Singing", "SharedMeasures", "Rhythm"]
    var allTasksDone = [movementDone, emotion1Done,      emotion2Done,      mbemaDone, singingDone, sharedDone, rhythmDone]
    for(b in allTasksNames){
      if(allTasksDone[b] == "done"){
        console.log("Done " + allTasksNames[b] + ". Storing cookie..")
        var cookieExpires = (new Date(Date.now()+ 86400*10000)).toUTCString();
        document.cookie = allTasksNames[b] + "=" + allTasksDone[b] + ";" + "expires=" + cookieExpires
      }
    }

    allTasksNames.map(i => {
      if(getCookie(i) == "done"){
        document.getElementById("task" + i).style.background = "lightgreen";
      }
    })

    var lang = urlParamsIndex.get('lang')

    if(lang == undefined){
      var lang = 'eng'
    }

    //Rendering only sub-batteries from study
    var studyID = urlParamsIndex.get('studyID')
    if(studyID == undefined){
      var studyID = "main"
    }
    var version = studyIDtasks[studyID]["version"]

    //Set cookie for client
    var clientID = getCookie("clientID") 
    if(clientID == ''){
      var clientID = urlParamsIndex.get('clientID');
      setCookie("clientID", clientID, 100)
      console.log("setting cookie")
    }

    function changeLangURL(lang, studyID){
      redir =  window.location.origin;
      var urlRedirect = redir + "/chooseBattery.html?lang=" + lang + "&studyID=" + studyID + '&user=' + userID;
      location.href = urlRedirect
    }

    var studyIDtasksRender = studyIDtasks[studyID]['timeline']

    for(a in studyIDtasksRender){
      document.getElementById("task" + studyIDtasksRender[a]).style.display = "block"
    }

    document.getElementById("movementTaskIcon").innerHTML = taskIcons['movement'][lang]
    document.getElementById("singingTaskIcon").innerHTML = taskIcons['singing'][lang]
    //document.getElementById("emotionTaskIcon1").innerHTML = taskIcons['emotion1'][lang]
    document.getElementById("emotionTaskIcon2").innerHTML = taskIcons['emotion2'][lang]
    //document.getElementById("emotionTaskIcon1").innerHTML = taskIcons['emotion1'][lang]

    Array.from(document.querySelectorAll("#emotionTaskIcon1")).map(i => i.innerHTML = taskIcons['emotion1'][lang])

    document.getElementById("surveyTaskIcon").innerHTML = taskIcons['survey'][lang]
    document.getElementById("mbemaTaskIcon").innerHTML = taskIcons['MBEMA'][lang]
    document.getElementById("rhythmTaskIcon").innerHTML = taskIcons['rhythm'][lang]


    //Add estimated time
    if(version == "short"){
      document.getElementById("movementTaskIconTime").innerHTML = taskIcons['movementTime'][lang]
      document.getElementById("singingTaskIconTime").innerHTML = taskIcons['singingTime'][lang]
      document.getElementById("emotionTaskIcon2Time").innerHTML = taskIcons['emotion2Time'][lang]
      Array.from(document.querySelectorAll("#emotionTaskIcon1Time")).map(i => i.innerHTML = taskIcons['emotion1Time'][lang])
      document.getElementById("surveyTaskIconTime").innerHTML = taskIcons['surveyTime'][lang]
      document.getElementById("mbemaTaskIconTime").innerHTML = taskIcons['MBEMATime'][lang]
      document.getElementById("rhythmTaskIconTime").innerHTML = taskIcons['rhythmTime'][lang]
    } else {
      console.log("long")
    }
    //End of add estimated time

    document.getElementById("langEng").onclick = function(){
      changeLangURL("eng", studyID)
    }
    document.getElementById("langFi").onclick = function(){
      changeLangURL("fi", studyID)
    }

    //Watch if user logged in
    var userID = urlParamsIndex.get('user')
      if(userID !== null){ //If user logged in, stay in choose battery, else go to auth
        console.log(userID)
        //document.getElementById("userName").innerHTML = "Hello, " + user.displayName
        document.getElementById("linkToMovement").onclick = function(){
          var movementRedirect = studyLinks['movementLink'] + '?lang=' + lang + '&user=' + userID + '&studyID=' + studyID;
          location.href = movementRedirect
        }
        document.getElementById("linkToEmotion").onclick = function(){
          var emotionRedirect = studyLinks['emotionLink'] + '?lang=' + lang + '&user=' + userID  + '&studyID=' + studyID;
          location.href = emotionRedirect
        }
        document.getElementById("linkToEmotionAdaptive").onclick = function(){
          var emotionRedirect = studyLinks['emotionAdaptiveLink'] + '?lang=' + lang + '&user=' + userID + '&part=One' + '&studyID=' + studyID;
          location.href = emotionRedirect
        }
        document.getElementById("linkToEmotionAdaptive2").onclick = function(){
          var emotionRedirect = studyLinks['emotionAdaptiveLink'] + '?lang=' + lang + '&user=' + userID + '&part=Two' + '&studyID=' + studyID;
          location.href = emotionRedirect
        }
        document.getElementById("taskSharedMeasures").onclick = function(){
          var sharedDirect = studyLinks['sharedLink'] + '?lang=' + lang + '&user=' + userID + '&studyID=' + studyID;
          location.href = sharedDirect
        }
        document.getElementById("taskMBEMA").onclick = function(){
          var mbemaDirect = studyLinks['mbema'] + '?lang=' + lang + '&user=' + userID + '&studyID=' + studyID;
          location.href = mbemaDirect
        }
        document.getElementById("taskSinging").onclick = function(){
          var singingDirect = studyLinks['singingLink'] + '?lang=' + lang + '&user=' + userID + '&studyID=' + studyID;
          location.href = singingDirect
        }
        document.getElementById("taskRhythm").onclick = function(){
          var rhythmDirect = studyLinks['rhythmLink'] + '?lang=' + lang + '&user=' + userID + '&studyID=' + studyID;
          location.href = rhythmDirect
        }
      } else {
        location.href = "/";
      }
