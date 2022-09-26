import MeetupDetail from "../../components/meetups/MeetupDetail";
import { MongoClient, ObjectId } from "mongodb";

export default function MeetupDetails(props){

    return (
        <MeetupDetail
            img={props.meetupData.image}
            title={props.meetupData.title}
            address={props.meetupData.address}
        />
    );
};

export async function getStaticPaths(){

     const client = await MongoClient.connect(
         'mongodb+srv://elifsutanyeri:nRBZ6kUGZoLgoI46@apartmentmanagement.1ukos.mongodb.net/?retryWrites=true&w=majority',
     );

     const db = client.db();
     const meetupsCollection = db.collection('meetups');
     const meetups = await meetupsCollection.find({}, {_id: 1}).toArray();

     client.close();

    return {
        fallback: false,
        paths: meetups.map((smth) => ({ params: { meetupId: smth._id.toString() } })),
    };
}

export async function getStaticProps(context){

    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect(
        'mongodb+srv://elifsutanyeri:nRBZ6kUGZoLgoI46@apartmentmanagement.1ukos.mongodb.net/?retryWrites=true&w=majority',
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({_id: ObjectId(meetupId)});

    client.close();

    

    return {
        props: {
            meetupData: {
                id:selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                image: selectedMeetup.image,
                address: selectedMeetup.address
            }
        },
    };
}