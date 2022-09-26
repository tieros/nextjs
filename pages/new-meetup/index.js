import NewMeetupForm from '../../components/meetups/NewMeetupForm';

export default function NewMeetup(){

    async function meetupHandler(enteredData){

        try{       
            
            const response = await fetch('/api/new-meetup', {
        method: 'POST',
        body: JSON.stringify(enteredData),
        headers: {
            'Content-Type': 'application/json'
        }
       });    
       
        const data = await response.json();
        console.log(data)}
        catch (error) {
            console.log(error)
        }

    };


    return (
        <NewMeetupForm onAddMeetup={meetupHandler}/>
    )
}