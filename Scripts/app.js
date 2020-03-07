/**
* Name: Heather Grandovec
* Id: 100478347
* Description: Lab 2 - jQuery & Form Validation
* Date Completed: 06-MAR-2020 
* Source Code:https://github.com/durhamprogrammer/WEBD6201-W2020-Lesson6 
* My Github Link:  https://github.com/naheedshaikh/WEBD6201-lab-2.git 
*/

// JavaScript Class named Contact
class Contact
{
    constructor(contactName = "", emailAddress = "", contactNumber = "", contactMessage = "")
    {
        this.contactName = contactName;
        this.emailAddress = emailAddress;
        this.contactNumber = contactNumber;
        this.contactMessage = contactMessage;
    }
}

// JavaScript Class named User
class User
{
    constructor(firstName = "", lastName = "", userName = "", email = "", password = "")
    {
        this.firstName = firstName;
        this.lastName = lastName;
        this.userName = userName;
        this.email = email;
        this.password = password;
    }
}  


"use strict";
//IIFE - Immediately Invoked Function Expression
// mean? -> anonymous self-executing function

let app;
(function(app){

    // Declare Function Variables here...
    console.log("%cDeclaring Variables", "color: red;")
    let contactObject = new Contact();

    /**
     * Variable initialization in this function
     *
     */
    function Start()
    {
       PageSwitcher();

        Main();
    }

    function PageSwitcher()
    {
        let name = window.location.pathname;

       let pageName = name.substring(1, name.length - 5);

       switch(pageName)
        {
            case "index":
               DisplayHomePageContent();
                break;
            case "products":
                DisplayProductsContent();
                break;
            case "services":
                DisplayServicesContent();
                break;
            case "about":
                DisplayAboutContent();
                break;
            case "contact":
                DisplayContactContent();
                break;
            case "projects":
                DisplayProjectsContent();
                break;
            case "login":
                DisplayLoginContent();
                break;
            case "register":
                DisplayRegisterContent();
                break;
            default:
                console.error("Landed in a page that is not defined");
                break;
        }

        // add a class of active to the active link
        $("#"+pageName).addClass("active");
    }

    function DisplayHomePageContent()
    {
        document.getElementById("home").className = "nav-item active";
        /* $("button").click(()=>{
            location.href = "projects.html";
        }); */

        document.title = "WEBD6201 - Home";

        let progressbar = $( "#progressBar" ).progressbar({
            value: 37
          });

        console.log(progressbar);

        $("#projectsButton").click(function(){
            $(this).fadeOut(3000, "linear", ()=>{
                $(this).fadeIn(1000, "linear", ()=>{
                    location.href = "projects.html";
                });
            });
        });
    }

    function DisplayProductsContent()
    {
        document.title = "WEBD6201 - Products";
    }

    function DisplayServicesContent()
    {
        document.title = "WEBD6201 - Services";
    }

    function DisplayAboutContent()
    {
        document.title = "WEBD6201 - About Us";
    }

    function DisplayContactContent()
    {
        document.title = "WEBD6201 - Contact Us";
        function clearForm()
        {
            //document.getElementById("contactForm").reset();
            $("#contactForm")[0].reset();
            $("#errorMessage").hide();
        }

        function validateInput(selector, condition, errorMessage)
        {
            if(condition)
            {
                $("#errorMessage").show();
                $("#errorMessage").text(errorMessage);
                $(selector).select();
                $(selector).css("border", "2px solid red");
            }
            else
            {
                $("#errorMessage").hide();
                $(selector).css("border", "1px solid #ced4da");
            }
        }

        $("#errorMessage").hide();
        $("#contactName").select();

        // Contact Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 2),"Contact Name is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Email Events
        $("#emailAddress").blur((e)=>
        {
            validateInput("#emailAddress",($("#emailAddress").val().length < 8) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });

        // Contact Number Events
        $("#contactNumber").blur((e)=>
        {
            let phonePattern = /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/
            let phoneNumber = $("#contactNumber").val();

            validateInput("#contactNumber",( !phonePattern.test(phoneNumber)),"Invalid Contact Number");
        });

        $("#contactNumber").focus((e)=>
        {
            $("#contactNumber").select();
        });

        // Contact Message Events
        $("#contactMessage").blur((e)=>
        {
            validateInput("#contactMessage",( $("#contactMessage").val().length < 2 ),"Contact Message Too Short");
        });

        $("#contactMessage").focus((e)=>
        {
            $("#contactMessage").select();
        });


        $("#contactForm").submit  ((e)=>
        {
            if(document.getElementById("contactForm").checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }

            
            let contactName = $("#contactName").val();
            let emailAddress = $("#emailAddress").val();
            let contactNumber = $("#contactNumber").val();
            let contactMessage = $("#contactMessage").val();

            console.log(`Contact Name: ${contactName}`);
            console.log(`Email Address: ${emailAddress}`);
            console.log(`Contact Number: ${contactNumber}`);
            console.log(`Contact Message: ${contactMessage}`);

            contactObject.contactName = contactName;
            contactObject.emailAddress = emailAddress;
            contactObject.contactNumber = contactNumber;
            contactObject.contactMessage = contactMessage;

            console.log(contactObject);

            clearForm();
        });

        $("#resetButton").click((e)=>
        {
            e.preventDefault();
            if(confirm("Are You Sure?"))
            {
                clearForm();
            }

            
        });
    }

    function DisplayProjectsContent()
    {
        document.title = "WEBD6201 - Projects";
    }

    //******Login Page********
    function DisplayLoginContent()
    {
        document.title = "WEBD6201 - Login";

        
        $("#errorMessage").hide();
        $("#contactName").select();

        // User Name Events
        $("#contactName").blur((e)=>
        {
            validateInput("#contactName",( $("#contactName").val().length < 4),"Username is Too Short");
        });

        $("#contactName").focus((e)=>
        {
            $("#contactName").select();
        });

        // Password Events
        $("#password").blur((e)=>
        {
            validateInput("#password",($("#password").val().length < 6), " Password is too short ");
        });

        $("#emailAddress").focus((e)=>
        {
            $("#emailAddress").select();
        });
       
        $("#loginForm").submit  ((e)=>
        {
            //userName show at the nevbar after contact us element
            let userName = $('input#contactName').val();
            User.userName = userName;

            if($("#loginForm")[0].checkValidity() == false)
            {
                e.preventDefault();
                e.stopPropagation();
                console.log("form not valid");
            }
            else
            {
                e.preventDefault();
                e.stopPropagation();
                $("#loginForm")[0].reset();
                $("#login").hide();
                $("#logout").show();
                
                $("#login").before ($("<li>").addClass("navbar-text").text('Welcome '+ userName)).show();
                console.log(userName);
            }
            clearForm($("#loginForm"));
        });

    }

    /** 
     * register Page started from here
     * Added all the validation , error message , confirm password and @ sign include in email
    */
    function DisplayRegisterContent()
    {
        document.title = "WEBD6201 - Register";

        let errorMessage = $("<div>").attr("id", "errorMessage").addClass("alert alert-danger");
        $(".hint-text").append(errorMessage);

       $("#errorMessage").hide();
      
        $("#firstName").select();
     // First Name Event
    $("#firstName").blur((e)=>
    {
        validateInput("#firstName",( $("#firstName").val().length < 2),"First Name is too short.");
    });

    $("#firstName").focus((e)=>
    {
        $("#firstName").select();
    });

    // Last Name Event
    $("#lastName").blur((e)=>
    {
        validateInput("#lastName",( $("#lastName").val().length < 2),"Last Nameis too short.");
    });

    $("#lastName").focus((e)=>
    {
        $("#lastName").select();
    });

    // Email Event
    $("#emailAddress").blur((e)=>
    {
        validateInput("#emailAddress",($("#emailAddress").val().length < 2) || (!$("#emailAddress").val().includes("@")),"Invalid Email Address");
    });

    $("#emailAddress").focus((e)=>
    {
        $("#emailAddress").select();
    });

    // Username Events
    $("#username").blur((e)=>
    {
        validateInput("#username",( $("#username").val().length < 2),"User name must not be less then 2 characters.");
    });

    $("#userame").focus((e)=>
    {
        $("#userame").select();
    });

    // Password Events
    $("#password").blur((e)=>
    {
        validateInput("#password",($("#password").val().length < 2),"Password must be atleast 6 characters in length.");
    });

    $("#password").focus((e)=>
    {
        $("#password").select();
    });

    // Confirm Password Events
    $("#confirmPassword").blur((e)=>
    {
        let userPassword = $("#confirmPassword").val();
        let confirmUserPass = $("#password").val();
        validateInput("#confirmPassword",(confirmUserPass != userPassword),"Confirm Password must match the Password.");
    });

    $("#confirmPassword").focus((e)=>
    {
        $("#confirmPassword").select();
    });
 
    $("#registerForm").submit ((e)=>
    {
        let firstName = $("#firstName").val();
        let lastName = $("#lastName").val();
        let emailAddress = $("#emailAddress").val();
        let username = $("#username").val();
        let password = $("#password").val();
        
        User.firstName = firstName;
        User.lastName = lastName;
        User.emailAddress = emailAddress;
        User.username = username;
        User.password = password;

        console.log(`Name: ${firstName}` + ` ${lastName}`);
        console.log(`Email Address: ${emailAddress}`);
        console.log(`Username: ${username}`);

        if($("#registerForm")[0].checkValidity() == false)
        {
            e.preventDefault();
            e.stopPropagation();
            console.log("form not valid");
        }
        else
        {
            e.preventDefault();
            e.stopPropagation();
            $("#registerForm")[0].reset();
            $("#login").show();
            $("#logout").hide();
        }

    clearForm($("#registerForm"));
});

    }

    // function to clear all the inputs 
    function clearForm(selector)
        {
            $(selector)[0].reset();
            $("#errorMessage").hide();
        }

    // function to display or hide error messages depending on user input and condition
    function validateInput(selector, condition, errorMessage)
    {
        if(condition)
        {
            $("#errorMessage").show();
            $("#errorMessage").text(errorMessage);
            $(selector).select();
            $(selector).css("border", "2px solid red");
        }
        else
        {
            $("#errorMessage").hide();
            $(selector).css("border", "1px solid #ced4da");
        }
    }
    /**
     * Main Program entry point is here
     *
     */
    function Main()
    {
       
    }
    
    

    window.addEventListener("load", Start);
})(app || (app = {}));

