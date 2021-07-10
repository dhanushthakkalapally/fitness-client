import React, {Component} from "react";
import PublicSiteHeader from "./publicSiteHeader";

class PublicSiteContainer extends Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <>
                <section>
                    <PublicSiteHeader/>
                </section>
            </>
        )

    }
}

export default PublicSiteContainer;