import * as settingsRepository from "../repositories/settings.repository";

export const getSettings = async () => {
  let settings = await settingsRepository.getSettings();

  if (!settings) {
    settings =
      await settingsRepository.createDefaultSettings();
  }

  return settings;
};

export const updateSettings = async (data: {
  depotName: string;
  currency: string;
  distanceUnit: string;
}) => {
  const settings = await getSettings();

  if (
    !data.depotName ||
    !data.currency ||
    !data.distanceUnit
  ) {
    throw new Error("All fields are required");
  }

  return settingsRepository.updateSettings(
    settings.id,
    {
      depotName: data.depotName,
      currency: data.currency,
      distanceUnit: data.distanceUnit,
    }
  );
};