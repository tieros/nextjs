import MeetupList from '../components/meetups/MeetupList';
import { MongoClient } from 'mongodb';
import Head from 'next/head';

export default function Home(props) {
    return (
    <>
    <Head>
        <title>Meetups</title>
        <meta name='description' content='Browse meetups' />
    </Head>
    <MeetupList meetups={props.meetups} />
    </>
    );
}

export async function getStaticProps() {
    //can connect to DB here since it is secure (server-side)

    const client = await MongoClient.connect(
        process.env.MONGO,
    );

    const db = client.db();
    const meetupsCollection = db.collection('meetups');

    const meetups = await meetupsCollection.find().toArray();

    // find lists all documents
    return {
        props: {
            meetups: meetups.map((meetup) => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            })),
        },
        revalidate: 10,
    };
}
