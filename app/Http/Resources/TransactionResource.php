<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'type' => $this->type,
            'date' => $this->date,
            'formatted_date' => $this->date->format('d/m/Y H:i'),
            'amount' => $this->amount->amount(),
            'current_balance' => $this->account->getBalanceForDate($this->date),
        ];
    }
}
