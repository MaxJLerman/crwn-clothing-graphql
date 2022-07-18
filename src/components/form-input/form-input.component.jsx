import './form-input.styles.scss'

const FormInput = ({ label, ...otherProperties }) =>
{
    return(
        <div className="group">
            <input className="form-input" {...otherProperties} />
            {
                label && ( <label className={`${otherProperties.value.length ? 'shrink' : '' } form-input-label`}></label> )
            }
        </div>
    );
}

export default FormInput;