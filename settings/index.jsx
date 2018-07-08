const colorSet = [
  {color: '#FF6347'}, // tomato
  {color: '#F4A460'}, // sandybrown
  {color: '#FFD700'}, // gold
  {color: '#7FFFD4'}, // aquamarine
  {color: '#00BFFF'}, // deepskyblue
  {color: '#DDA0DD'}, // plum
  {color: '#FFFFFF'}  // white
];

function SettingsPage(props) {
  return (
    <Page>
      <Section
        title={<Text bold align="center">CHANGE CLOCK COLOR</Text>}>
        <ColorSelect
          settingsKey="clockColor"
          colors={colorSet}
        />
      </Section>
    </Page>
  );
}

registerSettingsPage(SettingsPage);