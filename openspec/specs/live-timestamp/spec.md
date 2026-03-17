## ADDED Requirements

### Requirement: Timestamp displays current date and time
The LiveTimestamp component SHALL display the current date and time in the format `YYYY.MM.DD_HH:MM:SS`.

#### Scenario: Component renders
- **WHEN** the LiveTimestamp component mounts
- **THEN** it displays the current timestamp in the format `YYYY.MM.DD_HH:MM:SS`

#### Scenario: Time progresses
- **WHEN** one second passes
- **THEN** the timestamp updates to show the new current time

### Requirement: Timestamp updates every second
The LiveTimestamp component SHALL update the displayed time every second.

#### Scenario: Time passes
- **GIVEN** the component is mounted
- **WHEN** time progresses
- **THEN** the timestamp updates every 1000 milliseconds

### Requirement: Timestamp uses 24-hour format
The LiveTimestamp component SHALL use 24-hour time format for the hours.

#### Scenario: Time displays
- **WHEN** the time is 2:30 PM
- **THEN** the timestamp shows `14:30` not `02:30 PM`

### Requirement: Timestamp pads single digits
The LiveTimestamp component SHALL pad single-digit months, days, hours, minutes, and seconds with leading zeros.

#### Scenario: Date is January 5th
- **WHEN** the date is January 5th, 2026
- **THEN** the timestamp shows `2026.01.05` not `2026.1.5`

#### Scenario: Time is 9:05:03
- **WHEN** the time is 9:05:03
- **THEN** the timestamp shows `09:05:03` not `9:5:3`

### Requirement: Timestamp uses monospace font
The LiveTimestamp component SHALL use a monospace font for the timestamp display.

#### Scenario: Timestamp renders
- **WHEN** the timestamp is displayed
- **THEN** it uses the Liberation Mono font family

### Requirement: Timestamp cleanup on destroy
The LiveTimestamp component SHALL clean up the update interval when the component is destroyed.

#### Scenario: Component unmounts
- **GIVEN** the component has an active interval timer
- **WHEN** the component is destroyed
- **THEN** the interval is cleared to prevent memory leaks

### Requirement: Timestamp prefixed with label
The LiveTimestamp display SHALL be prefixed with "TS: " to match the technical annotation aesthetic.

#### Scenario: Timestamp displays
- **WHEN** the timestamp renders
- **THEN** it shows as "TS: 2026.03.17_14:30:45" not just the date
