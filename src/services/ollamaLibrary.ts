import axios from "axios";
import { load } from "cheerio";

interface OllamaModelTag {
  name: string;
  size: number;
  sizeHumanReadable: string;
  updated: string;
}

interface OllamaModel {
  name: string;
  baseModel: string;
  description: string;
  pullCount: string;
  updated: string;
  capabilities?: string;
  size?: string;
  tags?: OllamaModelTag[];
  readme?: string;
}

export class OllamaLibraryService {
  private static readonly API_URL = `http://localhost:${import.meta.env.VITE_SERVER_PORT || 3000}/api/ollama/library`;

  static async getAvailableModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(this.API_URL);
      const $ = load(response.data);
      const models: OllamaModel[] = [];

      // Find all model links
      $('a[href^="/library/"]').each((_, element) => {
        const $el = $(element);
        const $parent = $el.parent();

        // Extract basic information
        const baseModel = $el.attr("href")?.split("/").pop() ?? "";
        const description = $parent.find('p.max-w-lg').text().trim();
        const pullCount = $parent.find('span[x-test-pull-count]').text().trim();
        const updated = $parent.find('span[x-test-updated]').text().trim();
        
        // Extract capabilities
        const capabilities = $parent
          .find('span[x-test-capability]')
          .text()
          .trim();

        // Extract all size variants
        const sizes = $parent
          .find('span[x-test-size]')
          .map((_, sizeEl) => $(sizeEl).text().trim())
          .get();

        // If no sizes found, create one model with base name
        if (sizes.length === 0 && baseModel) {
          models.push({
            name: baseModel,
            baseModel,
            description,
            pullCount,
            updated,
            ...(capabilities && { capabilities }),
          });
        } else {
          // Create a model for each size variant
          sizes.forEach((size) => {
            if (baseModel) {
              // Extract size value (e.g., "7B" from "7B GGUF")
              const sizeValue = size.split(" ")[0];
              const modelName = `${baseModel}:${sizeValue.toLowerCase()}`;
              
              models.push({
                name: modelName,
                baseModel,
                description,
                pullCount,
                updated,
                size,
                ...(capabilities && { capabilities }),
              });
            }
          });
        }
      });

      // Fetch additional details for each model
      await Promise.all(
        models.map(async (model) => {
          try {
            await this.enrichModelWithDetails(model);
          } catch (error) {
            console.error(`Error fetching details for ${model.name}:`, error);
          }
        })
      );

      return models;
    } catch (error) {
      console.error("Error fetching Ollama models:", error);
      throw new Error("Failed to fetch available models");
    }
  }

  private static async enrichModelWithDetails(model: OllamaModel): Promise<void> {
    try {
      // Use baseModel for fetching details since that's the actual model name in the library
      const modelResponse = await axios.get(
        `${this.API_URL}/${model.baseModel}`
      );
      const $model = load(modelResponse.data);

      // Extract readme
      const readme = $model('textarea:contains("# ")').text().trim();
      if (readme) {
        model.readme = readme;
      }

      // Fetch tags
      const tagsResponse = await axios.get(
        `${this.API_URL}/${model.baseModel}/tags`
      );
      const $tags = load(tagsResponse.data);

      const tags: OllamaModelTag[] = [];
      $tags('a.group').each((_, element) => {
        const $tag = $tags(element);
        const name = $tag.attr("href")?.split("/").pop() ?? "";
        const sizeText = $tag.parent().next().children().text().split("•")[1].trim();
        const updated = $tag.next().next().text().trim();

        // Parse size
        const sizeMatch = sizeText.match(/(\d+(?:\.\d+)?)\s*(GB|MB|KB|B)/);
        let size = 0;
        if (sizeMatch) {
          const [, value, unit] = sizeMatch;
          const multiplier = {
            B: 1,
            KB: 1024,
            MB: 1024 * 1024,
            GB: 1024 * 1024 * 1024,
          }[unit];
          size = parseFloat(value) * (multiplier ?? 1);
        }

        tags.push({
          name,
          size,
          sizeHumanReadable: sizeText,
          updated,
        });
      });

      if (tags.length > 0) {
        model.tags = tags;
      }
    } catch (error) {
      console.error(`Error enriching model ${model.name}:`, error);
    }
  }
} 