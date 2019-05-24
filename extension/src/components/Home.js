import React from 'react'
import UsageStatistic from './UsageStatistic'
import DisableButton from './DisableButton'
import SettingsAccordion from './SettingsAccordion'

export default ({
  statistics,
  disabledHosts,
  currentUrl,
  onSiteDisable,
  onSiteEnable,
  disabledOnChange
}) => (
  <div>
    <UsageStatistic
      filesProcessed={statistics.filesProcessed}
      bytesProcessed={statistics.bytesProcessed}
      bytesSaved={statistics.bytesSaved}
    />
    <DisableButton
      disabledHosts={disabledHosts}
      currentUrl={currentUrl}
      onSiteDisable={onSiteDisable}
      onSiteEnable={onSiteEnable}
    />
    <SettingsAccordion
      disabledHosts={disabledHosts}
      disabledOnChange={disabledOnChange}
    />
  </div>
)
