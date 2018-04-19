function Batch_Util(req, resp){
  
    var testAuthDeveloperReqParams ={
        path:"auth_developer",
        developer_email:"a@a.com",
        developer_password:""
    }
    
    var testGetCollectionsReqParams ={
        path:"get_collections",
        dev_token : "aaaaaabbbbbbbbbccccccccccccccc=="
    }
    
    var testGetCollectionSchemaReqParams ={
        path:"get_collection_schema",
        dev_token : "aaaaaabbbbbbbbbccccccccccccccc==",
        collection_id:"fecbf8aa0bee879ca2ceecd0c741"
    }
    
    var testLoadCollection = {
        "path":"load_collection",
        "dev_token":"aaaaaabbbbbbbbbccccccccccccccc==",
        "collection":"TestCollection2",
        "items":[
            {"id":"1","imanufacturer":"Evans & Sutherland","impartnumber":"230-132-111AA","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"2","imanufacturer":"Evans & Sutherland","impartnumber":"230-132-111AA","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"3","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"4","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"5","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"6","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"7","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"8","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""},
            {"id":"9","imanufacturer":"Evans & Sutherland","impartnumber":"230-120-112AC","iserialnumber":"","isimcategory":"Visual","iparttype":"PCB","idescription":"","igroup":"1","ilocation":"Offsite","isold":""}
        ]
    };
    
    var testLoadUsers = {
        "items":[
            {"email":"a@a.com"," address1":" 101 A Street"," address2":" Apt A"," city":" Austin"," state":" Texas","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"b@b.com"," address1":" 101 B Street"," address2":" Apt B"," city":" Billings"," state":" Montana","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"c@c.com"," address1":" 101 C Street"," address2":" Apt C"," city":" Cary"," state":" North Carolina","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"d@d.com"," address1":" 101 D Street"," address2":" Apt D"," city":" Denver"," state":" Colorado","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"e@e.com"," address1":" 101 E Street"," address2":" Apt E"," city":" El Segundo"," state":" California","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"f@f.com"," address1":" 101 F Street"," address2":" Apt F"," city":" Fargo"," state":" North Dakota","zipcode":" 78701","phone":" 512-555-1111"},
            {"email":"g@g.com"," address1":" 101 G Street"," address2":" Apt G"," city":" Greenville"," state":" South Carolina","zipcode":" 78701","phone":" 512-555-1111"}
        ],
        "path":"load_users"
    }
    
    var testLoadDevices ={
        "items":[
            {"name":"pump101","state":"in use","enabled":true,"description":"Drilling pump in Texas","type":"rotary Screw","manufacturer":"ACME Corp"},
            {"name":"generator4","state":"idle","enabled":true,"description":"Locamotive generator on line 45","type":"18 cylinder","manufacturer":"MOM Corp"},
            {"name":"thunderboard99","state":"unprovisioned","enabled":false,"description":"Thunderboard for indoor agriculture","type":"Thunderboard Sense 2","manufacturer":"Silicon Labs"},
            {"name":"racer2000","state":"active","enabled":true,"description":"Passive RFID sensor for people tracking","type":"Passive RFID","manufacturer":"NXP"}
        ],
        "path":"load_devices"
    }

    // req.params = testLoadDevices;
    
    var response = {
        err:false,
        messages:[],
        result : {}
    };
    
    var authDeveloper = function() {
        
        var options = {
            uri: platformURLl+"/admin/auth/",
            body: {"email":req.params.developer_email,"password":req.params.developer_password}
        };
        var requestObject = Requests();
        requestObject.post(options, function(err,httpresponse) {
            log("return from dev auth call")
            log(err);
            log(httpresponse);
            if (err !== false){
                response.err = true;
                response.messages.push("Unable to get dev token");
                sendResponse();
            }
             else {
                response.result = JSON.parse(httpresponse);
                sendResponse();
            }
            
        });
    }
    
    
    
    var getCollections = function() {
        var options = {
            uri: platformURL+"/admin/allcollections?appid="+req.systemKey,
            headers :{"ClearBlade-DevToken": req.params.dev_token,
                "Accept": "application/json, text/plain, */*"
                
            }
        };
        log("options");
        log(options)
        var requestObject = Requests();
        requestObject.get(options, function(err,httpresponse) {
            log("return from dev get collections")
            log(err);
            log(httpresponse);
            if (err === true){
                response.err = true;
                response.messages.push("Unable to get system Collections");
            }
             else {
                allCollections = JSON.parse(httpresponse);
                response.result = allCollections;
                sendResponse();
            }
            
        });
    }
    
    var getCollectionSchema = function() {
        
        var options = {
            uri: platformURL+"/api/v/1/data/"+req.params.collection_id+"/columns",
            headers :{"ClearBlade-DevToken": req.params.dev_token},
            body: {}
        };
        var requestObject = Requests();
        requestObject.get(options, function(err,httpresponse) {
            if (err === true){
                response.err = true;
                response.messages.push("Unable to get collection columns");
                sendResponse();
            }
             else {
                allColumns = JSON.parse(httpresponse);
                response.result = allColumns;
                sendResponse();
            }
        });
    }
    
    var loadCollection = function() {
        ClearBlade.init({"request":req})
        var callback = function (err, data) {
            if (err === true){
                response.err = true;
                response.messages.push("Unable to load data in collection, check permissions");
                sendResponse();
            }
             else {
                response.result="import successful, see item_id below"
                response.messages.push(data);
                sendResponse();
            }
        };
        var col = ClearBlade.Collection({collectionName: req.params.collection});
        col.create(req.params.items, callback);
    }
    
    var generatePassword = function (length) {
        var chars = "abcdefghijklmnopqrstuvwxyz!@#$%^&*()-+ABCDEFGHIJKLMNOP1234567890";
        var pass = "";
        for (var x = 0; x < length; x++) {
            var i = Math.floor(Math.random() * chars.length);
            pass += chars.charAt(i);
        }
        return pass;
    }
    
    
    var loadUsers = function() {
        ClearBlade.init({request:req});
        var user = ClearBlade.User();
        for( var i =0 ; i <req.params.items.length; i++){
            
            var userItem = req.params.items[i];
            var password = generatePassword(10);
            ClearBlade.registerUser(userItem.email, password, function(err, body) {
        		if(err) {
					response.err = true;
                    response.messages.push("Failed to create user "+userItem.email+":  "+JSON.stringify(body));
                    
				} else {
					response.messages.push({email:userItem.email, password: password});
					var query = ClearBlade.Query();
                    query.equalTo("email",userItem.email)
                    var changes = userItem;
                    delete changes.email;
                    var userUpdateCallback = function(err, data){
                    }
					user.setUsers(query,changes,userUpdateCallback)
				}
        	});

            
        };
        if (response.err==true){
            response.result = "Load of users completed with some errors, review messages";
        }else{
            response.result = "Load of users completed successfully, review messages for password information";
        }
        sendResponse();
        
    }
    
    var loadDevices = function() {
        ClearBlade.init({request:req});
        var user = ClearBlade.User();
        for( var i =0 ; i <req.params.items.length; i++){
            
            var deviceItem = req.params.items[i];
            var activeKey = generatePassword(20);
            var createDeviceCallback = function (err, data) {
                if (err) {
                	response.err = true;
                    response.messages.push("Failed to create devioce "+deviceItem.name+":  "+JSON.stringify(data));
                    
                } else {
                	response.messages.push({name:deviceItem.name, active_key: activeKey});
                }
            };
        
            var dev = ClearBlade.Device();
            deviceItem.active_key = activeKey;
            deviceItem.allow_key_auth = true;
            deviceItem.allow_certificate_auth = false;
            deviceItem.enabled = (deviceItem.enabled == 'true');
            
            dev.create(deviceItem, createDeviceCallback);
        };
        if (response.err==true){
            response.result = "Load of devices completed with some errors, review messages";
        }else{
            response.result = "Load of devices completed successfully, review messages for activekey information";
        }
        sendResponse();
        
    }
    
    var sendResponse = function(){
        if (response.err){
            resp.error(response)
        }else{
            resp.success(response);    
        }
        
    };
    
    if (req.params.path=="auth_developer"){
        authDeveloper();
    }else if (req.params.path =="get_collections"){
        getCollections();
    }else if (req.params.path == "get_collection_schema"){
        getCollectionSchema();
    }else if (req.params.path == "load_collection"){
        loadCollection();
    }else if (req.params.path == "load_devices"){
        loadDevices();
    }else if (req.params.path == "load_users"){
        loadUsers();
    }
  
}