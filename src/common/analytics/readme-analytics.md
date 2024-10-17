# Findable-UI Analytics Readme

Findable-UI reports various events using Google Analytics 4.
All events are defined in `entities.ts` and can be trigged using the `track` function in `analytics.ts`.
See below a list of the currently available events.

### GA4 Event Inventory

| Event                     | Parameters                                       | Description                                                     |
| ------------------------- | ------------------------------------------------ | --------------------------------------------------------------- |
| `bulk_download_requested` | `catalog`, `current_query`, `index`, `tool_name` | Runs when the HCA-DCP "Request curl command" button is selected |
| `entity_selected`         | `entity_name`                                    | Runs when an entity (tab) is selected                           |
| `entity_table_paginated`  | `entity_name`, `pagination_direction`            | Runs when the page forward/backwards buttons are clicked        |
| `entity_table_sorted`     | `entity_name`, `column_name`, `sort_direction`   | Runs each time a column in the entity table is sorted           |
| `filter_selected`         | `filter_name`, `filter_value`                    | Runs each time a filter is selected                             |

### Tracking-related ID Inventory

Some GA4 Events are tracked using ids instead of events. Below is an inventory of the ids that, when clicked, trigger an event:

| Component            | Id name                          | "All Elements" or "Just Links"? | Purpose                                     |
| -------------------- | -------------------------------- | ------------------------------- | ------------------------------------------- |
| `SupportRequestForm` | `button-support-request`         | "All Elements"                  | To track submitted support requests         |
| `ExportMethod`       | The value passed as `trackingId` | "All Elements"                  | To separately track ExportMethod events     |
| `ExportButton`       | `button-cohort-export`           | "Just Links"                    | To track clicks to the Cohort Export button |
