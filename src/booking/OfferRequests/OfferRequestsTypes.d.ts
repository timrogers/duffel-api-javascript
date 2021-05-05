import { CabinClass, Offer, PlaceType } from 'types'

export interface OfferRequestSlice {
  /**
   * The ISO 8601 date on which the passengers want to depart
   */
  departure_date: string
  /**
   * The city or airport the passengers want to travel to
   */
  destination: DestinationOrOriginProp | string
  /**
   * The city or airport the passengers want to depart from
   */
  origin: DestinationOrOriginProp | string
  origin_type: PlaceType
  destination_type: PlaceType
}

/**
 * The passengers who want to travel. A passenger will have only a type or an age.
 */
export interface OfferRequestPassenger {
  /**
   * The age of the passenger on the `departure_date` of the final slice.
   */
  age?: number

  /**
   * The type of the passenger.
   */
  type?: 'adult'

  /**
   * The identifier for the passenger, unique within this Offer Request and across all Offer Requests.
   * This ID will be generated by Duffel unless you had optionally provided one.
   * Optionally providing one has been deprecated.
   */
  id: string
}

/**
 * To search for flights, you'll need to create an offer request.
 * An offer request describes the passengers and where and when they want to travel (in the form of a list of slices).
 * It may also include additional filters (e.g. a particular cabin to travel in).
 * @link https://duffel.com/docs/api/offer-requests/schema
 */
export interface OfferRequest {
  /**
   * The slices that make up this offer request.
   * One-way journeys can be expressed using one slice, whereas return trips will need two.
   * @link https://duffel.com/docs/api/overview/key-principles
   */
  slices: OfferRequestSlice[]
  cabin_class?: CabinClass
  created_at: string
  id: string
  live_mode: boolean
  offers?: Omit<Offer, 'available_services'>[]
  passengers: OfferRequestPassenger[]
}

export interface CreateOfferRequest {
  cabin_class: CabinClass
  passengers: Omit<OfferRequestPassenger, 'id'>[]
  slices: Omit<OfferRequestSlice, 'origin_type' | 'destination_type'>[]
}

export interface CreateOfferRequestQueryParameters {
  /**
   * When set to `true`, the offer request resource returned will include all the offers returned by the airlines.
   * If set to `false`, the offer request resource won't include any offers.
   * To retrieve the associated `offers` later, use the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint, specifying the `offer_request_id`.
   * You should use this option if you want to take advantage of the pagination, sorting and filtering that the [List Offers](https://duffel.com/docs/api/offers/get-offers) endpoint provides.
   */
  return_offers: boolean
}
