export default class WebTransaction{
    createAccount(username,password,email){
        
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: new Date().getTime(),
                userName: username,
                password: password,
                emailId: email,
                status: "active",
                role: "ROLE_USER"
            })
        };

        fetch("https://assignment-production-4374.up.railway.app/create",requestOptions).then(this.onCreateSuccess);
    }

    async login(email,password){
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({ userName: email,password: password})
        };
        return await fetch("https://assignment-production-4374.up.railway.app/login",requestOptions);
    }

    onCreateSuccess(data)
    {
        if(data.status === 200){
            data.json().then(data => {
                alert("created successful ",data);
            });
        }
        else{
            data.json().then(data => {
                alert(data.error);    
            });  
        }
    }

    async check(token){
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer '+token},

        };
        return await fetch("https://assignment-production-4374.up.railway.app/check",requestOptions);
    }

    async logout(token){
        localStorage.setItem("token",null);
        localStorage.setItem("user",null);

        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer '+token},

        };
        fetch("https://assignment-production-4374.up.railway.app/logou",requestOptions).then((data)=>{
            console.log(data);
        });
    }

    async getAllHistory(token){
        console.log()
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: { 'Content-Type': 'application/json', 'Authorization':'Bearer '+token},

        };
        return await fetch("https://assignment-production-4374.up.railway.app/admin/history/get",requestOptions);
    }
}