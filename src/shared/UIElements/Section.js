import classes from "./Section.module.css"

const Section = (props) => {
    return(
        <div id={props.id} className={classes.section}>
            <fieldset className={classes["section-outline"]}>
                <legend className={classes["section-legend"]}>
                    {props.name}
                </legend>
                {props.children}
            </fieldset>
        </div>
    )
}

export default Section