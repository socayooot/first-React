To my understanding, after reading the provided websockets article, websockets are used to exchange real world data between the browser and the server
through a persistent connection. The data is sent as a packet that does not break the connection which allows for it be seen across different tabs
and different areas in real-time. For this homework assignment, I utilized my react folder and simply modified using the help of ChatGPT. The code, itself
is coded out and reflects my effort in trying to understand what is going on in the future. To my understanding, I am currently using the react framework
which is essentially a package that helps build a website using specific tools. I am currently using a websocket which I defined earlier. In this homeowork
assignment, I am tasked to create a client and allow them to communicate back and forth across different tabs. As I was coding this, app.jsx involves coding
in the perspective of the user, "what happens if I do this as the user"; on the other hand, the websocketserve.js communicates in a way of how does the 
server deal with these requests and what to do. The fist step is to open some websocket somewhere which is chosen to be port 8080, when the client types
a message, it is important that they are communicating on the same ports. The server side is responsible for behavior of actions while the app.jsx is 
responsible for the user actions. 

VULBNERABILITIES
One of the main ones that I could think of, is that since someone is essentially just putting a username into the system, they do not have to add any 
credentials or do any login, so its pretty free access if someone simply opens my stuff which is kind of scary.

Additionally, to my understanding, since I am using a chatbox, a hacker could, theoretically, type some kind of script and have it run through the front
end HTML side. I tried to limit spam so that the sender can only spam messages every three seconds.

I feel like having no limit on the amount of clients I can have present as the websocket is open, in itself, is a vulnerability. I think this way because
I am pretty sure that if someone keeps sending client information, it will eventually get slow and someone could crash the system. In the grand scheme of 
things for a large company, this could be deterimental.

It should be mentioned that the connection is not encrypted because I did not want to bother setting up SSL.

I do not utilize any premade-statements and I do not sanitize anything, the user can send whatever, they feel :).

Overall, I learned how little knowledge I have in coding with JS, I wish I took a class to better understand JS and how to code like this. After 
getting help from AI and tutorials, it makes a lot more sense, but it would be more beneificial for me and the future that I took a class to 
understand what is going on and how to write the code.

I should mention that my websocketserver is being ran on port 8080 while my localhost where the actual website is being run on is port 3000. To run must type npm run dev into the cmd line and node websocketserve.js.
