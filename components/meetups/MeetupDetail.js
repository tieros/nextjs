import style from './MeetupDetail.module.css';

export default function MeetupDetail(props) {
    return (
        <section className={style.detail}>
            <img
                src={props.img}
                alt={props.title}
            />
            <h1>{props.title}</h1>
            <address>{props.address}</address>
        </section>
    );
}
