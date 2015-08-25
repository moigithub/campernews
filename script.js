/*
var jsoncamper = [    {
        "_id": "55899ea7c1efe7451e6c3501",
        "headline": "A Year Long Coding Curriculum | Codecademy - Code Year",
        "link": "http://www.codecademy.com/en/tracks/code-year?code",
        "description": "",
        "author": {
            "picture": "https://lh5.googleusercontent.com/-TKL87JhXn-g/AAAAAAAAAAI/AAAAAAAACqU/0tVLA-DV-gY/photo.jpg",
            "userId": "5497f7a1e356230b001acec8",
            "username": "duttakapil",
            "email": "kapil.dutta28@gmail.com"
        },
        "__v": 3,
        "storyLink": "a year long coding curriculum codecademy code year",
        "image": "",
        "comments": [
            "558a0dbf956bbc0e2c327198"
        ],
        "upVotes": [
            {
                "upVotedBy": "5497f7a1e356230b001acec8",
                "upVotedByUsername": "duttakapil"
            },
            {
                "upVotedByUsername": "amusedalpaca",
                "upVotedBy": "5588c81adba4cd983976a3db"
            },
            {
                "upVotedByUsername": "bastek",
                "upVotedBy": "5561ee01fce51bd56d3869d8"
            }
        ],
        "rank": 3,
        "originalStoryAuthorEmail": "kapil.dutta28@gmail.com",
        "metaDescription": "Code Year takes you on a tour of important web technologies. Learn programming basics with Javascript, then add HTML and CSS to build interactive websites.",
        "timePosted": 1435082407800
    }];
*/

function gimmestring(str, len){
  if (str.length > len) return str.substr(0,len)+"...";
  return str;
}

var camperAPI = "http://www.freecodecamp.com/stories/hotStories";

$(document).ready(function() {
  var jqxhr = $.getJSON( camperAPI, function() {
    console.log( "success" );
  })
    .done(function(data) {
      console.log( "second success" );
      //console.log( data );
      
      // hide to avoid flickering
      $(".postlists").hide();
      data.map(function(postObj){
        //console.log(postObj);
        // post data
        var headline = $('<div class="headline"></div>');
        headline.html(postObj.headline);
        
        var desc = $('<div class="description"></div>');
        desc.html(gimmestring(postObj.description+" "+postObj.metaDescription,265));

//        var meta = $('<div class="metaDescription"></div>');
//        meta.html(gimmestring(postObj.metaDescription,80));
        
        var time = $('<div class="timeposted"></div>');
        
        var timestamp = new Date(postObj.timePosted);
        // request a weekday along with a long date
        var options = { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' };
        time.html(timestamp.toLocaleDateString('en-US', options));
        
        var votes = $('<div class="votes">Votes: '+postObj.upVotes.length+'</div>');

         // author data
        var pic = $('<div class="authorpic"></div>');
        pic.html("<img src='"+postObj.author.picture+"' alt='author'/>");
        var username = $('<div class="username"></div>');
        username.html(postObj.author.username);
        var email = $('<div class="email"></div>');
        email.html(postObj.author.email);
        
        var author = $('<div class="author"></div>'); // container
        author.append(pic);
        author.append(username);
        author.append(email);
        
        var link = $('<a href="'+postObj.link+'" target="_blank" class="link"></a>');
        link.append(author);
        
        var post = $('<div class="post"></div>');

        post.append( link);
        post.append(headline);
        post.append(desc);
   //     post.append(meta);
        post.append(time);
        post.append(votes);
        
        $(".postlists").append(post);
        
      });
      // show posts list after complete
      $(".postlists").show();
    })
    .fail(function() {
      console.log( "error" );
    })
    .always(function() {
      console.log( "complete" );
    });

  // Perform other work here ...

  // Set another completion function for the request above
  jqxhr.complete(function(data) {
    console.log( "second complete" );
   // console.log( data );
  });
});