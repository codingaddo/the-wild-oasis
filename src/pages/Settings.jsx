import UpdateSettingsForm from "../features/settings/UpdateSettingsForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Settings() {
  // const {isLoading , error, settingsData} = useSettings()
  // console.log(settingsData)
  return<Row>
    <Heading as="h1">Update hotel settings</Heading>
    <UpdateSettingsForm/>

  </Row>
}

export default Settings;
