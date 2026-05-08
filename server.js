const http=require('http');
class Resource{
    constructor(name,capacity,firstHourPrice,additionalHourPrice){
        this.name=name;
        this.capacity=capacity;
        this.firstHourPrice=firstHourPrice;
        this.additionalHourPrice=additionalHourPrice;
        this.currentUsers=0;
        this.activeUsers=[];
    }

    startUsage(username){
        if(this.currentUsers>=this.capacity){
            return "Resource is full";
        }

        this.activeUsers.push({
            username: username,
            startTime: new Date()
        });

        this.currentUsers++;
        return username+" started using the resource";
    }

    stopUsage(username){
        let usage=null;
        let index=-1;
        for(let i=0;i<this.activeUsers.length;i++){
            if(this.activeUsers[i].username===username){
                usage=this.activeUsers[i];
                index=i;
                break;
            }
        }

        if(usage===null){
            return "User is not using the resource";
        }

        let endtime=new Date();
        let durationMs=endtime-usage.startTime;
        let durationHours=Math.ceil(durationMs/(1000*60*60));
        let buildHours=Math.ceil(durationHours);
        let totalBill=this.firstHourPrice;
        if(buildHours>1){
            totalBill+=(buildHours-1)*this.additionalHourPrice;
        }
        this.activeUsers.splice(index,1);
        this.currentUsers--;
        return {
            user:username,
            hours:buildHours,
            totalBill: totalBill
        };
    }
}

    
    let room=new Resource("Meeting Room",2,30,10);
    const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const user = url.searchParams.get("user");

    if (pathname === "/start") {
        let result = room.startUsage(user);
        res.writeHead(200, {
            "Content-Type": "application/json"
        });
        res.end(JSON.stringify(result));
    }

    else if (pathname === "/stop") {
        let result = room.stopUsage(user);
        res.writeHead(200, {
            "Content-Type": "application/json"
        });

        res.end(JSON.stringify(result));
    }

    else {
        res.writeHead(404, {
            "Content-Type": "text/plain"
        });

        res.end("Route Not Found");
    }
});

    server.listen(3000,()=>{
            console.log("Server is running on port 3000");
        });
