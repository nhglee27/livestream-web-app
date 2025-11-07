# Live Stream OBS check list

### Password Validation Checklist

- [ ]  Ensure every password contains:
    - At least one uppercase letter
    - At least one special character
    - At least one number
    - Minimum length greater than 8 characters
- [ ]  Display error message and prevent registration if any character is used that does not exist on a standard computer keyboard

### Password Visibility Feature

- [ ]  Implement "Show/Hide" password toggle
- [ ]  Allow users to view entered password to:
    - Verify match with "Confirm Password" field
    - Adjust password to avoid repeated login failures

### UI/UX Adjustments

- [ ]  Ensure all UI elements are distinct and properly separated
- [ ]  Prevent screen breakage or layout overflow during navigation between pages
- [ ]  Fix any border overflow or clipping issues
- [ ]  Replace all logos, text, and references related to the live stream web with **"HaloKastStream"**

### Action Feedback & Validation

- [ ]  Display success notification for every action (e.g., "Live created successfully")
- [ ]  Show detailed error messages when actions fail
- [ ]  Validate all required fields before allowing account creation or live stream setup
- [ ]  Highlight missing fields with inline warnings (do not allow submission until all required fields are filled)

### Bonus: Full English Localization

- [ ]  Convert all website text, labels, buttons, and messages to **English only**
- [ ]  Remove or translate any remaining non-English content