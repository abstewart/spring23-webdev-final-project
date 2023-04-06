export const Hours_Card = (
    {
        hours_dict =    {
            sunday : "8:00 AM - 5:00 PM",
            monday : "8:00 AM - 5:00 PM",
            tuesday : "8:00 AM - 5:00 PM",
            wednesday : "8:00 AM - 5:00 PM",
            thursday : "8:00 AM - 5:00 PM",
            friday : "8:00 AM - 5:00 PM",
            saturday : "8:00 AM - 5:00 PM"
        }
    })   => {

    return (
        <div className="accordion" id="accordionExample">
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                        Monday
                    </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {hours_dict.monday}
                    </div>
                </div>
            </div>
            <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                            data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                        Tuesday
                    </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                     data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                        {hours_dict.tuesday}
                    </div>
                </div>
            </div>
        </div>
    )
}