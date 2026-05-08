# UsageAndBillingSystem
Resource Usage & Billing System
Overview
This project is a simple backend system built using Node.js.
It manages a shared resource such as a meeting room and allows users to:


Start using the resource


Stop using the resource


Track active users


Calculate billing based on usage duration


Prevent usage when capacity is full


The project uses in-memory storage and does not require any database.

Data Structures Used
1. Class (Resource)
A class is used to manage all resource-related operations such as:


starting usage


stopping usage


billing


capacity handling



2. Array (activeUsers)
An array is used to store users currently using the resource.
Example:
activeUsers = [   {      username: "A",      startTime: Date   }]
The array helps in:


tracking active users


finding users during stop usage


removing users after billing



Logic & Approach
Step 1 — Create Resource
A resource is created with:


name


capacity


first hour price


additional hour price



Step 2 — Start Usage
When a user starts using the resource:


capacity is checked


user details are stored in activeUsers


current user count is increased


If capacity is full:


request is rejected



Step 3 — Stop Usage
When a user stops using the resource:


user is searched in activeUsers


usage duration is calculated


billing is calculated


user is removed from active users


current user count is decreased



Step 4 — Billing Calculation
Billing logic:


first hour has fixed price


additional hours use extra pricing


partial hours are rounded up using Math.ceil()


Example:


1 hour 20 minutes → 2 hours billing



Steps to Run
1. Open terminal
Move to project folder.

2. Run server
node server.js

3. Server starts on
http://localhost:3000

Steps to Test
Start Usage
http://localhost:3000/start?user=A

Stop Usage
http://localhost:3000/stop?user=A

Capacity Test
If capacity is 2:
/start?user=A/start?user=B/start?user=C
Third request returns:
Resource is full
