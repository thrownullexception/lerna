import * as redis from 'redis';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';

@Injectable()
export class CacheService {
  private redisClient: redis.RedisClient;
  constructor(private readonly configService: ConfigService) {
    this.redisClient = redis.createClient(this.configService.getRedisConfig());
  }

  private getAsync(key: string): Promise<string> {
    return new Promise((resolve, reject) => {
      this.redisClient.get(key, (err, reply) => {
        if (err) {
          return reject(err);
        }
        resolve(reply);
      });
    });
  }

  //   async getCoinsRewardForAdsWatch(): Promise<number> {
  //     return +(await this.remember(
  //       'ADS_REWARD_COINS',
  //       this.referenceService.getCoinsRewardForAdsWatch(),
  //     ));
  //   }

  clearLeaderBoardCache(): void {
    this.clearAllCacheMatching('leaderboard');
  }

  clearAllCacheMatching(key: string): void {
    this.redisClient.keys(`*${key}*`, (err, keys) => {
      keys.forEach(redisKey => {
        this.redisClient.del(redisKey);
      });
    });
  }

  async remember(
    key: string,
    fetchingFunction: Promise<string | number>,
    duration = 10, // minutes
  ): Promise<string> {
    let value = await this.getAsync(key);
    if (!value) {
      value = '' + (await fetchingFunction);
      this.redisClient.set(key, value, 'EX', duration);
    }
    return value;
  }

  //   async getQuestionIds(): Promise<number[]> {
  //     return JSON.parse(await this.getAsync(QUESTION_STORE_KEY));
  //   }

  //   async getGameState(): Promise<IGameState> {
  //     const gamePhase = await this.getAsync(GAME_PHASE_KEY);
  //     if (gamePhase) {
  //       return JSON.parse(gamePhase);
  //     }
  //     return {
  //       phase: GamePhase.COUNT_DOWN,
  //     };
  //   }

  //   async getCorrectUsers(): Promise<number[]> {
  //     const correctUsers = await this.getAsync(CORRECT_USERS);
  //     if (!correctUsers) {
  //       return [];
  //     }
  //     return JSON.parse(correctUsers);
  //   }
}
