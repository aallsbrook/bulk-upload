function Batch_Setup(req, resp){
    var uploaderPassword            = "clearblade1234";         // change this to something unique
    
    var response = {
        err:false,
        messages:[]
    };

    var new_user_id = "";
    var systemRoles =[];
    
    var getSystemRoles = function() {
         var options = {
            uri: platformURL+"/admin/user/"+req.systemKey+"/roles",
            headers :{"ClearBlade-DevToken": req.userToken},
            body: {}
        };
        var requestObject = Requests();
        requestObject.get(options, function(err,httpresponse) {
            if (err === true){
                response.err = true;
                response.messages.push("Unable to get System roles, Please ensure you are running this service from the Developer Console");
            }
             else {
                systemRoles = JSON.parse(httpresponse);
            }
            
        });
    };
    
    var addRoleToUser = function(role) {
        if (role===""){
            
        } else {
            var roleId = ""
            
            for( var i =0; i< systemRoles.length; i++){
                    
                if (systemRoles[i].Name == role){
                    roleId = systemRoles[i].ID;
                }
            }
            
            var options = {
                uri: platformURL+"/admin/user/"+req.systemKey,
                headers :{"ClearBlade-DevToken":req.userToken},
                body: {
                    "user":new_user_id,
                    "changes": {
                        "roles":
                            {
                                "add":[roleId]
                            }
                    }
                }
            };
            var requestObject = Requests();
            requestObject.put(options, function(err,httpresponse) {
                if (err === true){
                    
                }
                 else {
                    //role added
                }
                
            });
        }
    }
    
    var createUser = function(email, password, role){
        ClearBlade.init({
    		systemKey: req.systemKey,
    		systemSecret: req.systemSecret,
    		registerUser: true,
    		email: email,
    		password: password,
    		callback: function(err, body) {
    			if(err) {
    				response.err= true;
    				response.messages.push("Failed to create user "+email);
    			} else {
    			    new_user_id = body.user_id;
                    
    			    addRoleToUser(role);
    			    
    			}
    		}
    	});
    };
    
    var sendResponse = function(){
        if (response.err){
            resp.error(resposne)
        }else{
            resp.success(response);    
        }
        
    };
    var main = function() {
        getSystemRoles();
        createUser("uploader@clearblade.com", uploaderPassword, "Uploader");
        sendResponse();
    };
    
    main();
}