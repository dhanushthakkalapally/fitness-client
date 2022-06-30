import { Amplify, Auth} from 'aws-amplify';


Amplify.configure({
    // TODO: ALL THIS BELOW CONFIGURATION MUST COME FROM ENV VARIABLES
    Auth: {
        region: "eu-west-2",
         userPoolId: 'eu-west-2_bnsYfwIEv',
        userPoolWebClientId: "5un59hnfkjtjiq0c3nmnfvkuui"
    }
})
